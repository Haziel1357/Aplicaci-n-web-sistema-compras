import app from "./src/app.js"

const port = 3000;

app.listen(port, () => {
    console.log(`El servidor se está ejecutando por el puerto: ${port}`)
})

