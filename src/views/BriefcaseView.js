import React, { useState, useEffect } from "react";

function BriefcaseView() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const catRes = await fetch("https://delamuu.com:3001/briefcase-categories/");
        const categoriesData = await catRes.json();

        const categoriesWithProducts = await Promise.all(
          categoriesData.map(async (category) => {
            const prodRes = await fetch(
              `https://delamuu.com:3001/briefcase-products/category/${category.id}`
            );
            const productsData = await prodRes.json();
            return { ...category, products: productsData };
          })
        );
        setCategories(categoriesWithProducts);
      } catch (error) {
        console.error("Error al cargar la carta:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="briefcaseFatherContainer">
      <h1>nuestra deliciosa carta</h1>
      
      <ul>
        <li>📍 Av. Roque Sáenz Peña 192</li>
        <li>💳 Efectivo & Tarjeta</li>
        <li>📞 2364 512745</li>
      </ul>

      {loading ? (
        <p>Cargando....</p>
      ) : (
        categories.map((category) => (
          <div key={category.id} className="categoryContainer">
            <h2>{category.name}</h2>
            {category.products && category.products.length > 0 ? (
              category.products.map((product) => (
                <div
                  key={product.id}
                  className="productContainer"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <div className="leftProductContainer">
                    <h3>{product.name}</h3>
                    <span>{product.description}</span>
                  </div>
                  <div className="rightProductContainer" style={{ alignSelf: "center" }}>
                    <strong>${product.price}</strong>
                  </div>
                </div>
              ))
            ) : (
              <p className="noProductsInCategory">No hay productos para esta categoría.</p>
            )}
          </div>
        ))
      )}
    </section>
  );
}

export default BriefcaseView;
