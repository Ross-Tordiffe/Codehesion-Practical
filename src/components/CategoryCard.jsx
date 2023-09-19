import { useNavigate } from 'react-router-dom'

export default function CategoryCard({category}) {
    
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/category/${category.id}`);
    }
    
    return (
        <div className="category-card" id={category.id} onClick={handleClick}>
            <div className="category-name">{category.name}</div>
        </div>
    )
}