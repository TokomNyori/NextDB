'use server'
export async function getDataById({ pageName, currentID }: { pageName: string, currentID: any }) {
    const API_KEY = process.env.API_KEY

    if (pageName === 'tv-series') {
        const responses: any = []
        const details = await fetch(`https://api.themoviedb.org/3/tv/${currentID}?api_key=${API_KEY}`, { cache: 'force-cache' })
            .then(res => res.json())
        responses.push(details)

        const youtubeID = await fetch(`https://api.themoviedb.org/3/tv/${currentID}/videos?api_key=${API_KEY}`, { cache: 'force-cache' })
            .then(res => res.json())
            .then(data => data.results)
        responses.push(youtubeID)

        const cast = await fetch(`https://api.themoviedb.org/3/tv/${currentID}/credits?api_key=${API_KEY}`, { cache: 'force-cache' })
            .then(res => res.json())
            .then(data => data.cast)
        responses.push(cast)
        return responses
    } else {
        const responses: any = []
        const details = await fetch(`https://api.themoviedb.org/3/movie/${currentID}?api_key=${API_KEY}`, { cache: 'force-cache' })
            .then(res => res.json())
        responses.push(details)

        const youtubeID = await fetch(`https://api.themoviedb.org/3/movie/${currentID}/videos?api_key=${API_KEY}`, { cache: 'force-cache' })
            .then(res => res.json())
            .then(data => data.results)
        responses.push(youtubeID)

        const cast = await fetch(`https://api.themoviedb.org/3/movie/${currentID}/credits?api_key=${API_KEY}`, { cache: 'force-cache' })
            .then(res => res.json())
            .then(data => data.cast)
        responses.push(cast)
        return responses
    }
}