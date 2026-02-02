import { env } from '@techverse/env'
import { app } from './app'

app.get('/', () => 'Hello, World!')

app.listen({ port: env.PORT }).then(() => {
    console.log(`HTTP running on http://localhost:${env.PORT}`)
})
