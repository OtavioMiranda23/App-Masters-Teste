/** @type {import('next').NextConfig} */
module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.freetogame.com',
                pathname: '/g/**'

            },
        ],
    },
}