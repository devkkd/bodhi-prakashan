export const blogCategories = [
  { id: 'all', title: "All Blogs / सभी ब्लॉग" },
  { id: 'reading-notes', title: "Reading Notes / पढ़ते हुए" },
  { id: 'recommendations', title: "Book Recommendations / क्या पढ़ें" },
  { id: 'author-profiles', title: "Author Profiles / लेखक से मिलिए" },
  { id: 'hindi-lit', title: "Hindi Literature / साहित्य की बात" },
  { id: 'behind-shelf', title: "Behind the Shelf / हमारी नज़र से" },
  { id: 'reading-life', title: "Reading Life / पढ़ने की ज़िंदगी" }
];

export const blogs = [
  {
    slug: "why-godan-still-matters",
    categoryId: "reading-notes",
    categoryLabel: "Reading Notes / पढ़ते हुए",
    image: "/images/blogs/godan-blog.png", // Assuming you'll add placeholder images here
    title: "Why Godan still matters in 2026 / गोदान आज भी क्यों ज़रूरी है",
    readTimeEn: "5 min read",
    readTimeHi: "5 मिनट में पढ़ें",
    authorEn: "John Deo",
    authorHi: "जॉन डीओ",
    quoteHi: "\"होरी को किसान होने का दंड मिल रहा था\"",
    quoteEn: "Hori was being punished – simply for being a farmer. - Munshi Premchand, Godan (1936)",
    content: [
      {
        type: "heading",
        text: "Before we begin"
      },
      {
        type: "paragraph",
        text: "There is a particular kind of book that does not age. Not because it is timeless in the comfortable, decorative sense – but because the wound it describes never fully heals. Godan is that kind of book."
      },
      {
        type: "paragraph",
        text: "Munshi Premchand finished writing it in 1936. He died the same year, before he could see what it would become. What it became is this – the most honest novel ever written about the Indian countryside. About poverty that is not dramatic but grinding. About hope that is not triumphant but stubborn. About a man named Hori who wants, above everything else in the world, one thing. \nA cow. \nAnd about why, until his last breath, he never gets one."
      },
      {
        type: "heading",
        text: "What Godan actually is"
      },
      {
        type: "paragraph",
        text: "Most people know Godan by its reputation before they read it. A classic. A landmark. Prescribed in syllabi. Quoted in speeches about the Indian farmer.\nThat reputation, well-earned as it is, does slightly misleading work—it makes Godan sound like a monument. Something important and distant. Something you should read rather than something you will feel."
      }
    ]
  },
  // Add more dummy blogs here...
  {
    slug: "dinkar-poetry-relevance",
    categoryId: "hindi-lit",
    categoryLabel: "Hindi Literature / साहित्य की बात",
    image: "/images/blogs/dinkar-blog.png", 
    title: "The Fire of Dinkar: Reading Rashmirathi Today / दिनकर की आग",
    readTimeEn: "4 min read",
    readTimeHi: "4 मिनट में पढ़ें",
    authorEn: "Bodhi Team",
    authorHi: "बोधि टीम",
    quoteHi: "\"समर शेष है, नहीं पाप का भागी केवल व्याध, जो तटस्थ हैं, समय लिखेगा उनका भी अपराध।\"",
    quoteEn: "\"The war is not over... time will also judge those who remained neutral.\"",
    content: [
      {
        type: "heading",
        text: "The Voice of Rebellion"
      },
      {
        type: "paragraph",
        text: "Ramdhari Singh Dinkar's words are not meant to be read quietly in a corner; they are meant to be roared..."
      }
    ]
  }
];