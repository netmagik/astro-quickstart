export default async (request, context) => {
  const url = new URL(request.url)

  // Look for the query parameter, and return if we don't find it
  if (url.searchParams.get('method') !== 'transform') {
    return
  }

  const response = await context.next()
  const text = await response.text()

  // Search for the placeholder
  const regex = /LOCATION_UNKNOWN/i

  const location = `${context.geo.city}, ${context.geo.country.name}`

  const updatedText = text.replace(regex, location)


  return new Response(updatedText, response)
}
