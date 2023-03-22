import App from './components/app/app'
import './styles/global.scss'

const root = document.getElementById('root')

const app = new App()

root.append(app.render())
