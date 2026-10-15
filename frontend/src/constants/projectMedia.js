import bacaltosImage from '../assets/bacaltosproject.jpg'
import workspaceImage from '../assets/yuukoworkspace.jpg'

const assets = { bacaltos: bacaltosImage, workspace: workspaceImage }

export function getProjectImages(project) {
  if (project.images?.length) return project.images
  const src = assets[project.assetImage]
  return src ? [{ src, title: project.title, description: project.outcome, tags: project.tags, status: project.status }] : []
}
