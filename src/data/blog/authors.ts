import type { ImageMetadata } from 'astro';
import jimVerducci from '../../assets/team/jim-verducci.jpeg';

export interface Author {
  name: string;
  role: string;
  photo: ImageMetadata;
  /** Where the author's name and photo link to. */
  profileUrl: string;
  linkedin?: string;
  bio: string;
}

// Blog post authors, keyed by the `authorId` used in post frontmatter.
export const AUTHORS = {
  'jim-verducci': {
    name: 'Jim Verducci',
    role: 'CEO / Co-founder',
    photo: jimVerducci,
    profileUrl: '/the-team',
    linkedin: 'https://www.linkedin.com/in/jim-verducci/',
    bio: 'A seasoned entrepreneur with a background in tech consulting and platform engineering. Jim co-founded Apitopia Consulting, specializing in designing and scaling distributed software architectures. His experience exposed the need for robust authentication frameworks, leading him to create Wristband.',
  },
} satisfies Record<string, Author>;

export type AuthorId = keyof typeof AUTHORS;
