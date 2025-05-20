import { rawRequest } from 'graphql-request'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

const handleGraphQLRequest = async event => {
  const { request } = event
  try {
    const { query, variables } = await request.json()

    const result = await rawRequest(ENDPOINT, query, variables)
    
    return new Response(JSON.stringify(result), {headers: { 'content-type': 'application/json' }})
  } catch (err) {
    console.log(err.message)
    return new Response("Error", { status: 500 })
  }
}

async function handleRequest(event) {
  const url = new URL(event.request.url)

  //allow cors
  if (event.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }

  if (url.pathname === "/graphql") {
    return handleGraphQLRequest(event)
  } else {
    return new Response(JSON.stringify({ success: false, message: "Not found" }), {headers: { 'content-type': 'application/json' }})
  }
}
