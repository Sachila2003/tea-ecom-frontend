import { useState, useEffect } from "react";
import { useInView } from 'react-intersection-observer';
import './Home.css'; 
import teaPackImage from '../assets/images/tea-pack.png';

// --- Item Component ekt Animation ek set kr ---
const Item = ({ product, index }) => {
    const imageUrl = `http://localhost:5000/${product.imageUrl}`;

    // useInView hook එක පාවිච්චි කරනවා
    const { ref, inView } = useInView({
        triggerOnce: false, // Animation ek prk oni nm methn true krnw
        threshold: 0.1,  
    });

    return (
        <div 
            ref={ref} 
            className={`product-card ${inView ? 'is-visible' : ''}`}
            style={{ transitionDelay: `${index * 100}ms` }} 
        >
            <div className="product-image-container">
                <img src={imageUrl} className="product-image" alt={product.title} />
            </div>
            <div className="product-card-body">
                <h5 className="product-title">{product.title}</h5>
                <p className="product-description">{product.description}</p>
                <h5 className="product-price">Rs. {product.price}</h5>
            </div>
            <div className="product-card-footer">
                <a href="#" className="product-button btn-view-details">View Details</a>
                <a href="#" className="product-button btn-add-cart">Add to Cart</a>
            </div>
        </div>
    );
};

// Home Component
const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/products");
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setProducts(data);
            } catch (e) {
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <div className="loading-container"><h2>Loading Products...</h2></div>;
    if (error) return <div className="loading-container"><h2 style={{color: 'red'}}>{error}</h2></div>;

    return (
        <>
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-text-container">
                        <h1 className="hero-heading">
                            Pure Ceylon Tea
                            <span className="heading-outline">Taste of Paradise</span>
                            Redefined.
                        </h1>
                        <p className="hero-description-text">
                            Discover a curated collection of the finest single-origin teas, 
                            hand-picked from the lush gardens of Sri Lanka.
                        </p>
                        <a href="#products" className="hero-cta-button">Explore Our Collection</a>
                    </div>
                    <div className="hero-image-container">
                        <div className="image-blob-wrapper">
                            <div className="background-animated-blob"></div>
                            <img 
                                src={teaPackImage} 
                                alt="Aura Tea Premium Packet" 
                                className="hero-product-image" 
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Products Section --- */}
            <div className="products-section-container" id="products">
                <h1 className="products-section-title">Our Premium Selection</h1>
                <div className="product-grid">
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <Item key={product._id} product={product} index={index} />
                        ))
                    ) : (
                        <div className="no-products-message">
                            <h3>No products found at the moment.</h3>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;