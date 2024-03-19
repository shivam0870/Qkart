// import { AddShoppingCartOutlined } from "@mui/icons-material";
// import {
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   CardMedia,
//   Rating,
//   Typography,
//   Box
// } from "@mui/material";
// import React from "react";
// import "./ProductCard.css";

// const ProductCard = ({ product, handleAddToCart }) => {
  

//   return (
    
//     <Card className="card">
//     <CardMedia
//         component="img"
//         image={product.image}
//         alt="product"
//       />      
//    <CardContent>
//         <Typography gutterBottom variant="body2" component="div">
//           {product.name}
//         </Typography>
//         <Typography
//           variant="h6"
//           color="textPrimary"
//           sx={{ fontWeight: "bold" }}
//           mb={1}
//         >
//           ${product.cost}
//         </Typography>
//         <Box display="flex">
//           <Rating
//             name="read-only"
//             value={product.rating}
//             readOnly
//             size="small"
//           />
//           <Box sx={{ ml: 1 }}>({product.rating})</Box>
//         </Box>
//       </CardContent>
//       <CardActions className="card-actions">
//         <Button
//           color="primary"
//           variant="contained"
//           fullWidth
//           onClick={(e)=>handleAddToCart()}
//           className="card-button"
//         >
//           <AddShoppingCartOutlined /> &nbsp; ADD TO CART
//         </Button>
//       </CardActions>
//     </Card> 
//   );
// };

// export default ProductCard;




import { AddShoppingCartOutlined } from "@mui/icons-material";
import {Button,Card,CardActions,CardContent,CardMedia,CardActionArea,Rating,Typography,} from "@mui/material";import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  const {name,cost,rating,image,_id}=product;
// function pushToCart(e){
//   console.log(e.target.value)
// }
  return (
    <Card  className="card" sx={{maxWidth:385}}>
      <CardActionArea>
              <CardMedia
                component="img"
                height="240"
                image={image}
                alt={name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                 {name}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                 ${cost}
                </Typography>
                <Rating name="read-only" value={rating} readOnly />
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="" fullWidth color="primary" variant="contained" value={_id} onClick={handleAddToCart}>
              <AddShoppingCartOutlined />  ADD TO CART
              </Button>
            </CardActions>
    </Card>
  );
};

export default ProductCard;