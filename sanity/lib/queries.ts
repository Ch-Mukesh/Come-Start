import { defineQuery } from "next-sanity";

export const STARTUP_QUERY = defineQuery(`
  *[_type == "startup" && defined(slug.current) && !defined($search) || author->name match $search ||title match $search || category match $search] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _createdAt,
    author->{
      _id,
      name,
      image,
      bio
    },
    views,
    image,
    description,
    category,
    pitch
  }
`)


export const STARTUP_DETAIL_QUERY = defineQuery(`
  *[_type == "startup" && _id == $id][0] {
    _id,
    title,
    slug,
    _createdAt,
    author->{
      _id,
      name,
      image,
      bio
    },
    views,
    image,
    description,
    category,
    pitch
  }
`)

export const STARTUP_VIEWS_QUERY = defineQuery(`
  *[_type == "startup" && _id == $id][0] {
    views,_id
  }
  `)

export const AUTHOR_BY_GITHUB_ID_QUERY = `*[_type == "author" && id == $id][0]`

export const PLAYLIST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "playlist" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    select[]->{
      _id,
      title,
      slug,
    _createdAt,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    image,
    description,
    category,
    pitch
} 
  }
`)


