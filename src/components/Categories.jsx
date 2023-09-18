import Category from "./Category";
import { useState, useEffect } from "react";

export default function Categories() {

    const [categories, setCategories] = useState([])

    return (
        <>
            <div className="categories">
                <Category />
                <Category />
                <Category />
                <Category />
            </div>
        </>
    )
}