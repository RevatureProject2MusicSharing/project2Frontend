// Regex to get YouTube video IDs from a YouTube link
const regex = /(?:[?&]vi?=|\/embed\/|\/\d\d?\/|\/vi?\/|https?:\/\/(?:www\.)?youtu\.be\/)([A-Za-z0-9_\\-]{11})/

// Uses regex to get the YouTube video id
export function getYouTubeId(str: string): string | null {
    const result = regex.exec(str)
    let matchedString = null                    

    if (result) {
        matchedString = result[1]
    }

    return matchedString
}
