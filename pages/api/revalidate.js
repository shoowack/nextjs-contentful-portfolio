export default async function handler(req, res) {
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {

        console.log(req, 'req');
        console.log(req.query, 'req.query');
        console.log(req.query.secret, 'req.query.secret');

        return res.status(401).json({ message: 'Invalid token' })
    }

    try {
        await res.unstable_revalidate('/')
        return res.json({ revalidated: true })
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating')
    }
}