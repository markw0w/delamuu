import React, { useState, useEffect } from "react";

function BriefcaseView() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Traer categorías
        const catRes = await fetch("https://delamuu.com/briefcase-categories");
        const categoriesData = await catRes.json();

        // Para cada categoría, traemos sus productos
        const categoriesWithProducts = await Promise.all(
          categoriesData.map(async (category) => {
            const prodRes = await fetch(
              `https://delamuu.com/briefcase-products/category/${category.id}`
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
      <h1>Nuestra deliciosa carta</h1>
      
      {/* Datos del local */}
      <ul>
        <li>Dirección: Calle Falsa 123</li>
        <li>Medio de Pago: Efectivo, Tarjeta</li>
        <li>Teléfono: 123-456-7890</li>
      </ul>

      {loading ? (
        <p>Cargando...</p>
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
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>
                  <div style={{ alignSelf: "center" }}>
                    <strong>${product.price}</strong>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay productos para esta categoría.</p>
            )}
          </div>
        ))
      )}
    </section>
  );
}

export default BriefcaseView;
