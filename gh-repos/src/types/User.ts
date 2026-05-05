export type User = {
  login: string
  avatar_url: string
  html_url: string
  name: string | null
  bio: string | null
  email: string | null
  location: string | null
  followers: number
  following: number
  public_repos: number
  created_at: string
}
