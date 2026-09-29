module.exports = async (req, res) => {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) {
    return res.status(200).json({
      caterers: [],
      live: false,
      message: 'Configure GOOGLE_PLACES_API_KEY for live business results.',
    });
  }

  try {
    const names = [
      'Venus Catering Services',
      'Sri Saibala Catering Service',
      'Saraswathi Catering',
      'Sai Lakshmi Catering Services',
    ];
    const out = [];

    for (const q of names) {
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(q + ' Chennai')}&key=${key}`;
      const response = await fetch(url);
      const data = await response.json();
      const place = data.results?.[0];
      if (place) {
        out.push({
          placeId: place.place_id,
          name: place.name,
          address: place.formatted_address,
          rating: place.rating,
          reviews: place.user_ratings_total,
          image: place.photos?.[0]?.photo_reference
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=900&photo_reference=${place.photos[0].photo_reference}&key=${key}`
            : null,
          googleMapsUrl: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
        });
      }
    }

    res.status(200).json({ caterers: out, live: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Catering API failed' });
  }
};
