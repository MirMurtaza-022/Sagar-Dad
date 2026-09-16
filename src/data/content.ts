/**
 * CONTENT
 *
 * Everything factual about the artist (name, location, awards, clients,
 * publications, dates, career history) is a clearly marked placeholder in
 * [BRACKETS]. Replace with real information — do not treat any of it as fact.
 *
 * Photography is licensed stock imagery used to demonstrate the layout.
 */
import { photo, type Photo } from "@/lib/images";

/* ------------------------------------------------------------------ */
/* Artist                                                              */
/* ------------------------------------------------------------------ */

export const artist = {
  name: "[Artist Name]",
  roles: "Photographer / Filmmaker",
  statement: "Seeing stories between frames.",
  location: "[Location]",
  email: "[email address]",
  emailHref: "mailto:hello@example.com",
  instagram: "@[handle]",
  instagramHref: "https://instagram.com/",
  vimeo: "vimeo.com/[handle]",
  vimeoHref: "https://vimeo.com/",
  linkedin: "[Artist Name]",
  linkedinHref: "https://linkedin.com/",
  portrait: photo(36232024, 4640, 6960, "Portrait of the artist holding a camera in natural light.", "50% 30%"),
  secondaryImage: photo(5271331, 6000, 4000, "Foggy rocky mountain peaks on a moody day."),
  intro:
    "Photography, film and visual stories shaped by people, places and moments.",
  bio: [
    "[Artist biography — a short account of the artist's background, formative influences and the path into photography and film. Replace with the actual biography.]",
    "[Second paragraph — how the practice has developed, the themes that recur across the work, and the way commissions and personal projects inform one another.]",
    "[Third paragraph — approach to working with people and places, and what the artist is currently working towards.]",
  ],
  practice: [
    "Photography",
    "Filmmaking",
    "Videography",
    "Documentary",
    "Visual Storytelling",
    "Creative Direction",
  ],
  clients: ["[Client Name]", "[Client Name]", "[Client Name]", "[Client Name]", "[Client Name]", "[Client Name]"],
  exhibitions: [
    { year: "2024", title: "[Exhibition Title]", venue: "[Gallery / Venue]", location: "[City]" },
    { year: "2023", title: "[Exhibition Title]", venue: "[Gallery / Venue]", location: "[City]" },
    { year: "2022", title: "[Exhibition Title]", venue: "[Gallery / Venue]", location: "[City]" },
  ],
  collaborations: ["[Collaborator / Studio]", "[Collaborator / Studio]", "[Collaborator / Studio]"],
};

/* ------------------------------------------------------------------ */
/* Film                                                                */
/* ------------------------------------------------------------------ */

export type Film = {
  title: string;
  year: string;
  duration: string;
  category: string;
  src: string;
  poster: string;
  posterAlt: string;
  projectSlug?: string;
};

export const featuredFilm: Film = {
  title: "[Film Title]",
  year: "2024",
  duration: "12 min",
  category: "Short film",
  src: "https://videos.pexels.com/video-files/10234380/10234380-hd_1920_1080_30fps.mp4",
  poster:
    "https://images.pexels.com/videos/10234380/beach-cliff-drone-ocean-10234380.jpeg?auto=compress&cs=tinysrgb&w=1600",
  posterAlt: "Aerial view of rock formations and coastal cliffs meeting the sea.",
  projectSlug: "project-iv",
};

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type GalleryItem =
  | { type: "full"; image: Photo; caption?: string }
  | { type: "landscape"; image: Photo; align?: "left" | "right"; caption?: string }
  | { type: "portrait"; image: Photo; align?: "left" | "center" | "right"; caption?: string }
  | { type: "pair"; images: [Photo, Photo]; caption?: string }
  | { type: "cinematic"; image: Photo; caption?: string }
  | { type: "video"; film: Film }
  | { type: "text"; text: string };

export type ProjectCategory = "Photography" | "Film" | "Commission";

export type Project = {
  slug: string;
  number: string;
  title: string;
  category: ProjectCategory;
  year: string;
  location: string;
  cover: Photo;
  description: string[];
  meta: { client: string; role: string; year: string; location: string; medium: string };
  gallery: GalleryItem[];
  layout: "left" | "right" | "portrait" | "full";
};

export const projects: Project[] = [
  {
    slug: "project-i",
    number: "01",
    title: "[Project Title I]",
    category: "Photography",
    year: "2025",
    location: "[Location]",
    layout: "left",
    cover: photo(14227625, 7008, 4672, "A silhouetted mountain range enveloped in mist and cloud."),
    description: [
      "[Project description — what the series is about, where and when it was made, and the question or feeling that started it. Two or three sentences at most.]",
      "[Optional second paragraph — the approach, the constraints, and what the work became.]",
    ],
    meta: { client: "[Client / Personal]", role: "Photography, Direction", year: "2025", location: "[Location]", medium: "Medium format, colour" },
    gallery: [
      { type: "full", image: photo(18261765, 6720, 4480, "A mountain peak partially obscured by heavy cloud.") },
      { type: "landscape", image: photo(37911514, 6240, 4160, "Misty hills shrouded in morning fog."), align: "right" },
      { type: "portrait", image: photo(18651903, 6000, 4000, "A misty forest in black and white."), align: "left" },
      { type: "text", text: "[Short editorial note — a line about the sequence that follows, or a quote from the field notes.]" },
      { type: "pair", images: [photo(15510306, 6000, 4000, "A foggy hillside with a rustic fence."), photo(16166873, 6240, 4160, "Misty mountains under overcast cloud with trees in the foreground.")] },
      { type: "cinematic", image: photo(14590273, 6000, 4000, "Dark cloud looming over a forested mountain at dusk.") },
      { type: "landscape", image: photo(5271331, 6000, 4000, "Foggy rocky peaks on a moody day."), align: "left" },
      { type: "full", image: photo(13258051, 6016, 4016, "A mountain covered in dense fog and greenery.") },
    ],
  },
  {
    slug: "project-ii",
    number: "02",
    title: "[Project Title II]",
    category: "Photography",
    year: "2024",
    location: "[Location]",
    layout: "right",
    cover: photo(12087493, 6000, 4000, "Waves breaking on a beach at sunset beneath distant mountains."),
    description: [
      "[Project description — what the series is about, where and when it was made, and the question or feeling that started it.]",
    ],
    meta: { client: "[Client / Personal]", role: "Photography", year: "2024", location: "[Location]", medium: "35mm, colour" },
    gallery: [
      { type: "full", image: photo(38942815, 7728, 5152, "A coastline with deep blue water at twilight.") },
      { type: "pair", images: [photo(38942810, 7728, 5152, "A wooden railing overlooking the sea at twilight."), photo(11898889, 6720, 4480, "Sunset light reflecting on the surface of the sea.")] },
      { type: "portrait", image: photo(18274913, 8192, 5464, "Grass and a distant lake under a coloured sky at dusk."), align: "center" },
      { type: "text", text: "[Short editorial note — a line about the sequence that follows.]" },
      { type: "cinematic", image: photo(38908251, 7728, 5152, "Sunset over a calm sea in warm orange light.") },
      { type: "landscape", image: photo(38523406, 7008, 4672, "A tranquil coastal scene at sunset."), align: "right" },
      { type: "full", image: photo(8231167, 6625, 4417, "A coastal city as twilight descends.") },
    ],
  },
  {
    slug: "project-iii",
    number: "03",
    title: "[Project Title III]",
    category: "Photography",
    year: "2024",
    location: "[Location]",
    layout: "portrait",
    cover: photo(8284464, 4160, 6240, "Black and white portrait of an elderly man with a deeply lined face.", "50% 25%"),
    description: [
      "[Project description — who the people in this series are, how the artist came to photograph them, and what the portraits set out to hold.]",
    ],
    meta: { client: "[Client / Personal]", role: "Photography", year: "2024", location: "[Location]", medium: "Medium format, black and white" },
    gallery: [
      { type: "portrait", image: photo(1526890, 4160, 6240, "Black and white portrait of a smiling man wearing a traditional hat.", "50% 20%"), align: "center" },
      { type: "pair", images: [photo(14697083, 4160, 6240, "Black and white portrait of a woman wrapped in a plaid scarf.", "50% 20%"), photo(17911053, 4480, 6720, "Black and white portrait of an elderly woman in traditional clothing.", "50% 20%")] },
      { type: "text", text: "[Short editorial note — a line about the sitters, or the place the portraits were made.]" },
      { type: "cinematic", image: photo(12285040, 4024, 6024, "Silhouette of a woman gazing across a lake.", "50% 40%") },
      { type: "pair", images: [photo(5401896, 4000, 6000, "Black and white portrait of a man beside drapes in a dark room.", "50% 25%"), photo(14490223, 4000, 6000, "Black and white profile of a man deep in thought.", "50% 25%")] },
      { type: "portrait", image: photo(39205912, 4032, 6048, "Black and white photograph of a photographer at work outdoors."), align: "right" },
    ],
  },
  {
    slug: "project-iv",
    number: "04",
    title: "[Project Title IV]",
    category: "Film",
    year: "2023",
    location: "[Location]",
    layout: "full",
    cover: photo(13620627, 7797, 4369, "A desert dune at night with deep shadows and wind ripples."),
    description: [
      "[Project description — the premise of the film, where it was made and the people involved. Keep it to the essentials.]",
      "[Optional second paragraph — the visual approach and how the stills relate to the film.]",
    ],
    meta: { client: "[Client / Personal]", role: "Direction, Cinematography", year: "2023", location: "[Location]", medium: "Short film, digital cinema" },
    gallery: [
      { type: "full", image: photo(31415640, 7008, 4672, "Desert dunes in warm tones at sunset.") },
      { type: "video", film: featuredFilm },
      { type: "pair", images: [photo(8869381, 6000, 4000, "Close-up of wind patterns on desert sand."), photo(28639290, 6000, 4000, "Sunlit desert dunes with textured sand.")] },
      { type: "text", text: "[Short editorial note — a line about the stills made alongside the film.]" },
      { type: "portrait", image: photo(31838829, 8192, 4913, "Black and white shadow patterns across sand dunes."), align: "center" },
      { type: "cinematic", image: photo(998635, 6000, 4000, "Sunrise over golden sand dunes.") },
    ],
  },
  {
    slug: "project-v",
    number: "05",
    title: "[Project Title V]",
    category: "Commission",
    year: "2023",
    location: "[Location]",
    layout: "left",
    cover: photo(34434151, 6000, 4000, "Black and white architectural abstract with strong shadows."),
    description: [
      "[Project description — the brief, the building or place, and how the commission was approached.]",
    ],
    meta: { client: "[Client Name]", role: "Photography, Creative Direction", year: "2023", location: "[Location]", medium: "Digital, black and white" },
    gallery: [
      { type: "full", image: photo(39205556, 6000, 4000, "Architectural shadows falling across a building facade.") },
      { type: "portrait", image: photo(28608611, 4160, 6240, "A modern facade with stark shadows and dramatic light."), align: "left" },
      { type: "pair", images: [photo(17406399, 4000, 6000, "Shadows of a bridge structure cast on a white wall."), photo(19101642, 4000, 6000, "A concrete wall with dramatic shadows.")] },
      { type: "text", text: "[Short editorial note — a line about the sequence that follows.]" },
      { type: "landscape", image: photo(31098728, 6000, 4000, "Geometric architectural shadows against a clear sky."), align: "right" },
      { type: "portrait", image: photo(36969840, 6165, 9248, "Abstract shadow patterns on a textured concrete wall."), align: "center" },
    ],
  },
];

export const getProject = (slug?: string) => projects.find((p) => p.slug === slug);

export const adjacentProjects = (slug: string) => {
  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { prev, next };
};

/* ------------------------------------------------------------------ */
/* Awards                                                              */
/* ------------------------------------------------------------------ */

export type AwardCategory = "Photography" | "Film" | "Exhibitions";

export type Award = {
  id: string;
  year: string;
  status: string;
  name: string;
  project: string;
  projectSlug?: string;
  category: AwardCategory;
  image?: Photo;
};

export const awards: Award[] = [
  { id: "a1", year: "2025", status: "Winner", name: "[Award Name]", project: "[Project Title I]", projectSlug: "project-i", category: "Photography", image: projects[0].cover },
  { id: "a2", year: "2025", status: "Official Selection", name: "[Festival Name]", project: "[Film Title]", projectSlug: "project-iv", category: "Film", image: projects[3].cover },
  { id: "a3", year: "2024", status: "Finalist", name: "[Award Name]", project: "[Project Title II]", projectSlug: "project-ii", category: "Photography", image: projects[1].cover },
  { id: "a4", year: "2024", status: "Solo Exhibition", name: "[Gallery Name]", project: "[Project Title III]", projectSlug: "project-iii", category: "Exhibitions", image: projects[2].cover },
  { id: "a5", year: "2023", status: "Shortlist", name: "[Award Name]", project: "[Project Title IV]", projectSlug: "project-iv", category: "Film", image: projects[3].cover },
  { id: "a6", year: "2023", status: "Group Exhibition", name: "[Exhibition Name]", project: "[Project Title V]", projectSlug: "project-v", category: "Exhibitions", image: projects[4].cover },
  { id: "a7", year: "2022", status: "Honourable Mention", name: "[Award Name]", project: "[Project Title III]", projectSlug: "project-iii", category: "Photography", image: projects[2].cover },
  { id: "a8", year: "2022", status: "Official Selection", name: "[Festival Name]", project: "[Film Title]", projectSlug: "project-iv", category: "Film", image: projects[3].cover },
];

/* ------------------------------------------------------------------ */
/* Journal                                                             */
/* ------------------------------------------------------------------ */

export type ArticleBlock = { type: "paragraph"; text: string } | { type: "quote"; text: string; cite?: string };

export type Article = {
  slug: string;
  number: string;
  title: string;
  publication: string;
  date: string;
  year: string;
  category: string;
  author: string;
  excerpt: string;
  image: Photo;
  hero: Photo;
  body: ArticleBlock[];
  relatedProject: string;
  gallery: [Photo, Photo];
};

const articleBody = (subject: string): ArticleBlock[] => [
  { type: "paragraph", text: `[Opening paragraph — ${subject}. Replace with the article's actual introduction.]` },
  { type: "paragraph", text: "[Second paragraph — context for the work discussed, and the ideas the writer draws out of it.]" },
  { type: "quote", text: "[Pull quote — a single sentence from the article worth setting apart.]", cite: "[Artist Name]" },
  { type: "paragraph", text: "[Third paragraph — a closer reading of one project or one photograph.]" },
  { type: "paragraph", text: "[Closing paragraph — where the practice is heading, and the writer's final observation.]" },
];

export const articles: Article[] = [
  {
    slug: "the-art-of-seeing",
    number: "01",
    title: "The Art of Seeing",
    publication: "[Publication Name]",
    date: "2025",
    year: "2025",
    category: "Feature",
    author: "[Author Name]",
    excerpt: "[Article excerpt — one or two sentences describing the piece.]",
    image: photo(19785420, 4160, 6240, "Hands adjusting the settings on a camera outdoors."),
    hero: photo(13811051, 6048, 4024, "A camera operator filming outdoors with professional equipment."),
    body: articleBody("how the artist looks, waits and composes"),
    relatedProject: "project-i",
    gallery: [photo(16166873, 6240, 4160, "Misty mountains under overcast cloud."), photo(18651903, 6000, 4000, "A misty forest in black and white.")],
  },
  {
    slug: "in-conversation",
    number: "02",
    title: "In Conversation with [Artist Name]",
    publication: "[Publication Name]",
    date: "2024",
    year: "2024",
    category: "Interview",
    author: "[Author Name]",
    excerpt: "[Article excerpt — one or two sentences describing the conversation.]",
    image: photo(30697922, 6499, 4333, "Black and white photograph of a filmmaker standing beside a camera."),
    hero: photo(7634784, 6240, 4160, "A cinematic scene being captured with a professional video camera."),
    body: articleBody("an interview about people, patience and place"),
    relatedProject: "project-iii",
    gallery: [photo(1526890, 4160, 6240, "Black and white portrait of a smiling man wearing a hat.", "50% 20%"), photo(14697083, 4160, 6240, "Black and white portrait of a woman in a plaid scarf.", "50% 20%")],
  },
  {
    slug: "article-iii",
    number: "03",
    title: "[Article Title]",
    publication: "[Publication Name]",
    date: "2024",
    year: "2024",
    category: "Essay",
    author: "[Author Name]",
    excerpt: "[Article excerpt — one or two sentences describing the essay.]",
    image: photo(32610376, 7008, 4672, "A film camera set up with crew on a set."),
    hero: photo(32292610, 6016, 4016, "A filmmaker operating a camera on an outdoor set."),
    body: articleBody("an essay on the relationship between the films and the stills"),
    relatedProject: "project-iv",
    gallery: [photo(8869381, 6000, 4000, "Wind patterns across desert sand."), photo(31838829, 8192, 4913, "Black and white shadow patterns across dunes.")],
  },
  {
    slug: "article-iv",
    number: "04",
    title: "[Article Title]",
    publication: "[Publication Name]",
    date: "2023",
    year: "2023",
    category: "Feature",
    author: "[Author Name]",
    excerpt: "[Article excerpt — one or two sentences describing the feature.]",
    image: photo(10395639, 6000, 4000, "Close-up of a professional film camera on an outdoor set."),
    hero: photo(38942810, 7728, 5152, "A wooden railing overlooking the sea at twilight."),
    body: articleBody("a feature on the coastal series"),
    relatedProject: "project-ii",
    gallery: [photo(38523406, 7008, 4672, "A tranquil coastal scene at sunset."), photo(11898889, 6720, 4480, "Sunset light on the surface of the sea.")],
  },
];

export const getArticle = (slug?: string) => articles.find((a) => a.slug === slug);

export const adjacentArticle = (slug: string) => {
  const index = articles.findIndex((a) => a.slug === slug);
  return articles[(index + 1) % articles.length];
};

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Awards", to: "/awards" },
  { label: "Journal", to: "/journal" },
] as const;
