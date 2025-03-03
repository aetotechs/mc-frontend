import { useState, useEffect, useCallback } from 'react';
import api_urls from '../resources/api_urls';

const useProperties = (page = 0, size = 10, admin) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    const fetchProperties = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(api_urls.listings.get_all_listings(page, size));
            if (!response.ok) throw new Error(await response.text());
            const data = await response.json();
        
            if(admin){
                setProperties(data);
                console.log(data);
            } else {
                setProperties((prev) => {
                const uniqueItems = [...prev, ...data].filter(
                    (item, index, array) =>
                    array.findIndex((i) => i.id === item.id) === index
                );
                return uniqueItems;
                });
            }
        
            setHasMore(data.length === size);
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message || 'An error occurred');
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }, [page, size]);

    const fetchPropertyById = async (id) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(api_urls.listings.get_single_listing(id));
            if (!response.ok) {
                setError('Failed to fetch property');
            }
            const data = await response.json();
            console.log(data);
            setSuccess('Property fetched successfully');
            return data;
        } catch (err) {
            setError(err.message);
            return [];
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    return { properties, hasMore, loading, error, success, setSuccess, setError, fetchPropertyById };
};

export default useProperties;