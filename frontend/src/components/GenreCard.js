// import React, { useEffect, useState } from "react"
// import { useParams, Link } from "react-router-dom"

// import { showProduct } from "../reducers/shop"
// import { useSelector, useDispatch } from "react-redux"

// const Genre = () => {
//   const { genre } = useParams()
//   const [selection, setSelection] = useState("")
//   const products = useSelector((store) => store.shop.items)
//   const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(showProduct(genre))
//   }, [dispatch, genre])

//   const handleInput = () => {
//     showProduct(genre)
//     setSelection("")
//     setSelectedDetail([])
//   }
//   const onSetSelectionChange = (e) => {
//     setSelection(e.target.value)
//   }

//   if (!vinyl) {
//     return (
//       <div className="row center">

//         <h1> Not Found!</h1>
//       </div>
//     )
//   }
//   return (
//     <form onSubmit={handleInput}>
//       <select type="text" value={selection} onChange={onSetSelectionChange}>
//         <option value="">Search by Genre</option>
//         <option value="?genre=pop">Pop</option>
//         <option value="?genre=hiphop">Hip Hop</option>
//         <option value="?genre=rock">Rock</option>
//         <option value="?genre=jazz">Jazz</option>
//       </select>
//     </form>
//   )
// }

// export default Genre

import React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { CardActionArea } from "@mui/material"
// import Link from "@mui/material/Link"
import { Link } from 'react-router-dom'

const GenreCard = () => {
  return (
    <div className="genre-container">
      <Card sx={{ maxWidth: 200 }}>
        <CardActionArea>
        <Link to="/" color="inherit" underline="none">
          <CardMedia
            component="img"
            height="200"
            image="../assets/hiphop.png"
            alt="hiphop card"
          />
          <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                HIP HOP
              </Typography>
          </CardContent>
          </Link>
        </CardActionArea>
      </Card>

      <Card sx={{ maxWidth: 200 }}>
        <CardActionArea>
        <Link to="/" color="inherit" underline="none">
          <CardMedia
            component="img"
            height="200"
            image="../assets/rock.png"
            alt="rock pop card"
          />
          <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                ROCK / POP
              </Typography>      
          </CardContent>
          </Link>
        </CardActionArea>
      </Card>

      <Card sx={{ maxWidth: 200 }}>
        <CardActionArea>
        <Link to="/" color="inherit" underline="none">
          <CardMedia
            component="img"
            height="200"
            image="../assets/metal.png"
            alt="metal card"
          />
          <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                METAL
              </Typography>
          </CardContent>
          </Link>
        </CardActionArea>
      </Card>

      <Card sx={{ maxWidth: 200 }}>
        <CardActionArea>
        <Link to="/" color="inherit" underline="none">
          <CardMedia
            component="img"
            height="200"
            image="../assets/soul.png"
            alt="soul card"
          />
          <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                R&B / SOUL
              </Typography>
          </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default GenreCard
