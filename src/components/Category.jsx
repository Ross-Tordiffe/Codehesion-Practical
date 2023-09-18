export default function Category({category}) {
    return (
        <>
            <div className="category" id={category.id}>
                <div className="category-name">{category.name}</div>
            </div>
        </>
    )
}