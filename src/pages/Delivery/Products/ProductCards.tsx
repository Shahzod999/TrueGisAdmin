import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { getValidatedUrl } from "../../../app/hook/imgGetValidatedUrl";
import { useNavigate } from "react-router";

interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  imageThumbnail: string;
}

interface ProductCardsProps {
  products: Product[];
}

const ProductCards: React.FC<ProductCardsProps> = ({ products }) => {
  const navigate = useNavigate();
  const handleClick = (productId: string) => {
    console.log("Выбранный продукт ID:", productId);
    navigate(productId)
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  console.log(products[0].image);

  return (
    <Grid container spacing={3} padding={2} justifyContent="center">
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
          <Card
            onClick={() => handleClick(product._id)}
            sx={{
              position: "relative",
              height: 340,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `url(${getValidatedUrl(product.image)})`,
              cursor: "pointer",
              borderRadius: "15px",
              boxShadow: 3,
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}>
            <Box
              sx={{
                color: "white",
                fontWeight: "bold",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                padding: "8px 16px",
                borderRadius: "10px",
                textAlign: "center",
                width: "100%",
              }}>
              <Typography variant="h6">{product.name}</Typography>
            </Box>
            <CardContent
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
                padding: "12px",
                borderRadius: "0 0 15px 15px",
                textAlign: "center",
              }}>
              <Typography variant="body2">
                {truncateText(product.description, 100)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductCards;
