const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const r2 = require("../config/r2");
const Product = require("../models/Product");

// 🔥 HELPER: extract key from R2 URL safely
const getKeyFromUrl = (url) => {
  try {
    return decodeURIComponent(new URL(url).pathname.substring(1));
  } catch {
    return null;
  }
};

// 🔥 HELPER: delete single image
const deleteImageFromR2 = async (url) => {
  const key = getKeyFromUrl(url);
  if (!key) return;

  await r2.send(
    new DeleteObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: key,
    })
  );
};

// ✅ CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    let mainImageUrl = "";
    let galleryUrls = [];

    // MAIN IMAGE
    if (req.files?.mainImage?.[0]) {
      const file = req.files.mainImage[0];
      const fileName = `products/${Date.now()}-${file.originalname}`;

      await r2.send(new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      }));

      mainImageUrl = `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${fileName}`;
    }

    // GALLERY
    if (req.files?.galleryImages) {
      for (const file of req.files.galleryImages) {
        const fileName = `products/${Date.now()}-${file.originalname}`;

        await r2.send(new PutObjectCommand({
          Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
          Key: fileName,
          Body: file.buffer,
          ContentType: file.mimetype,
        }));

        galleryUrls.push(`${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${fileName}`);
      }
    }

    const product = await Product.create({
      title: req.body.title,
      writer: req.body.writer,
      description: req.body.description,
      note: req.body.note,
      price: Number(req.body.price),
      originalPrice: Number(req.body.originalPrice),
      readingTime: req.body.readingTime,
      inStock: req.body.inStock === "true",

      category: req.body.category,
      subCategory: req.body.subCategory,
      bookDetails: JSON.parse(req.body.bookDetails || "{}"),

      mainImage: mainImageUrl,
      galleryImages: galleryUrls,
    });

    res.json(product);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE PRODUCT (PROPER VERSION)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });

    let mainImageUrl = product.mainImage;
    let galleryUrls = [...(product.galleryImages || [])];

    // 🔥 REPLACE MAIN IMAGE
    if (req.files?.mainImage?.[0]) {
      const file = req.files.mainImage[0];
      const fileName = `products/${Date.now()}-${file.originalname}`;

      await r2.send(new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      }));

      // delete old
      if (product.mainImage) {
        await deleteImageFromR2(product.mainImage);
      }

      mainImageUrl = `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${fileName}`;
    }

    // 🔥 ADD NEW GALLERY IMAGES
    if (req.files?.galleryImages) {
      for (const file of req.files.galleryImages) {
        const fileName = `products/${Date.now()}-${file.originalname}`;

        await r2.send(new PutObjectCommand({
          Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
          Key: fileName,
          Body: file.buffer,
          ContentType: file.mimetype,
        }));

        galleryUrls.push(`${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${fileName}`);
      }
    }

    // 🔥 REMOVE IMAGES (if frontend sends remaining images)
    if (req.body.existingImages) {
      const remaining = JSON.parse(req.body.existingImages);

      // find deleted ones
      const deleted = galleryUrls.filter(url => !remaining.includes(url));

      // delete from R2
      await Promise.all(deleted.map(deleteImageFromR2));

      galleryUrls = remaining;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        writer: req.body.writer,
        description: req.body.description,
        note: req.body.note,
        price: Number(req.body.price),
        originalPrice: Number(req.body.originalPrice),
        readingTime: req.body.readingTime,
        inStock: req.body.inStock === "true",

        category: req.body.category,
        subCategory: req.body.subCategory,
        bookDetails: JSON.parse(req.body.bookDetails || "{}"),

        mainImage: mainImageUrl,
        galleryImages: galleryUrls,
      },
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE PRODUCT + IMAGES (OPTIMIZED)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });

    const allImages = [
      product.mainImage,
      ...(product.galleryImages || [])
    ].filter(Boolean);

    // 🔥 PARALLEL DELETE (FAST)
    await Promise.all(
      allImages.map(async (url) => {
        try {
          await deleteImageFromR2(url);
        } catch (err) {
          console.error("Delete failed:", url);
        }
      })
    );

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET ALL
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "nameHindi nameEnglish")
      .populate("subCategory", "title");

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET ONE
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .populate("subCategory");

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};