// -----------------------------------------------------------------------------
// Portfolio Type Definitions
// -----------------------------------------------------------------------------

/** Visual environment theme for each career chapter in the journey view. */
export type ChapterEnvironment =
  | 'campus'      // Kinneret Academic College
  | 'office'      // Bafi enterprise environment
  | 'lab'         // LetsTok.AI innovation lab
  | 'cloud';      // Igentify cloud-native healthcare

/** A single career milestone displayed on the journey timeline. */
export interface CareerMilestone {
  id: string;
  company: string;
  role: string;
  period: {
    start: string; // e.g. "Jan 2018"
    end: string;   // e.g. "Feb 2019" or "Present"
  };
  /** One-line summary of what the role entailed. */
  summary: string;
  /** Concrete, measurable achievements. */
  achievements: Achievement[];
  /** Core technologies used in this role. */
  techStack: string[];
  /** Visual chapter environment for the 3D journey. */
  environment: ChapterEnvironment;
  /** Zero-based chapter index (0-3). */
  chapterIndex: number;
}

/** A quantified achievement within a career milestone. */
export interface Achievement {
  /** Short human-readable label. */
  label: string;
  /** Metric value, if applicable (e.g. "30%", "+25%"). */
  metric?: string;
  /** Brief context explaining the achievement. */
  description: string;
}

/** Proficiency tier for individual skills. */
export type SkillProficiency = 'expert' | 'advanced' | 'proficient';

/** A single technical skill. */
export interface Skill {
  name: string;
  proficiency: SkillProficiency;
  /** Short description of where/how this skill was applied. */
  context: string;
}

/** A category grouping related skills. */
export interface SkillCategory {
  name: string;
  /** Lucide icon name to render next to the category header. */
  icon: string;
  /** Short description of this skill category. */
  description: string;
  skills: Skill[];
}

/** Personal / contact information. */
export interface PersonalInfo {
  name: string;
  /** Professional title / role descriptor. */
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  education: {
    degree: string;
    institution: string;
  };
  certifications: string[];
  strengths: string[];
}

/** Top-level portfolio data aggregate. */
export interface PortfolioData {
  personal: PersonalInfo;
  career: CareerMilestone[];
  skills: SkillCategory[];
}

/** Form data submitted via the contact modal. */
export interface ContactFormData {
  name: string;
  email: string;
  /** Hiring inquiry or project collaboration. */
  intent: 'hiring' | 'project';
  message: string;
  /** Optional job description or project brief. */
  details?: string;
}
