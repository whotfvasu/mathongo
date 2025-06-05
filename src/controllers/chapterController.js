import Chapter from "../models/Chapter.js";
import redis from "../config/redis.js";

export const uploadChapter = async (req, res) => {
  try {
    const chapters = req.body;
    const failedChapters = [];

    for (const chapter of chapters) {
      try {
        await Chapter.create(chapter);
      } catch (error) {
        failedChapters.push({ chapter, error: error.message });
      }
    }
    await redis.del("chapters"); //clearing redis cache after creating new chapters
    res.status(201).json({
      message: "chapters uploaded successfully",
      failedChapters,
    });
  } catch (error) {
    console.error("Error uploading chapter", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getChapters = async (req, res) => {
  try {
    const {
      class: classFilter,
      unit,
      status,
      weakChapters,
      subject,
      page = 1,
      limit = 10,
    } = req.query;

    const cachedData = await redis.get("chapters");

    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const query = {};
    if (classFilter) query.class = classFilter;
    if (unit) query.unit = unit;
    if (status) query.status = status;
    if (weakChapters) query.weakChapters = weakChapters === "true";
    if (subject) query.subject = subject;

    const skip = (page - 1) * limit;

    const [chapters, total] = await Promise.all([
      Chapter.find(query).skip(skip).limit(parseInt(limit)),
      Chapter.countDocuments(query),
    ]);

    const response = {
      totalChapters: total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      chapters,
    };

    // Cache the response in Redis for 1 hour
    await redis.set("chapters", JSON.stringify(response), "EX", 3600);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching chapters", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getChapterById = async (req, res) => {
  try {
    const { id } = req.params;
    const chapter = await Chapter.findById(id);
    if (!chapter) {
      return res.status(404).json({ message: "chapter not found" });
    }
    res.status(200).json(chapter);
  } catch (err) {
    console.error("Error fetching chapter by ID", err);
    res.status(500).json({ message: "server error", error: err });
  }
};
