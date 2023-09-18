import Category from "./Category";
import { useState, useEffect } from "react";

export default function CategoryView({categories}) {

    console.log('cateasdasgories', categories)
    return (
        <>
            <div className="categories">
                {categories.map((category) => (
                    <Category key={category.id} category={category} />
                ))}
            </div>
        </>
    )
}