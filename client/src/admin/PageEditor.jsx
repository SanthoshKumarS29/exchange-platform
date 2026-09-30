import React, { useEffect, useState } from 'react'
import { getHomepage, updateHomepage } from '../services/admin/PageEditorAPi';

const PageEditor = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        buttonText: '',
        buttonUrl: ''
    })

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getHomepage();;
                if (response.data && response.data.hero) {
                    setFormData({
                        title: response.data.hero.title || '',
                        description: response.data.hero.description || '',
                        buttonText: response.data.hero.buttonText || '',
                        buttonUrl: response.data.hero.buttonUrl || ''
                    });
                }
            } catch (error) {
                setError("Failed to load homepage content.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");

        try {
            await updateHomepage(formData);
            setSuccess("Homepage updated successfully.");

        } catch (error) {
            setError("Failed to update homepage.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold">Homepage Management</h2>
                <p className="text-gray-600 mt-1">Update the content displayed on the homepage.</p>
            </div>
            {error && (
                <div className="mb-4 bg-red-100 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-4 bg-green-100 text-green-700 px-4 py-3 rounded-lg">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-6 max-w-3xl">
                <h3 className="text-lg font-semibold mb-6">Hero Section</h3>

                <div className="space-y-5">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Hero Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter hero title" className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Hero Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter hero description" rows="5" className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    {/* Button Text */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Button Text</label>

                        <input type="text" name="buttonText" value={formData.buttonText} onChange={handleChange} placeholder="Start Trading" className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    {/* Button URL */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Button URL</label>

                        <input type="text" name="buttonUrl" value={formData.buttonUrl} onChange={handleChange} placeholder="/register" className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    {/* Submit */}
                    <div className="pt-3">
                        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Save Changes</button>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default PageEditor