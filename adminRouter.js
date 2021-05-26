const AdminRouter = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')

const AdminBroSequelize = require('@admin-bro/sequelize')
AdminRouter.registerAdapter(AdminBroSequelize)

const db = require("./models");
const { Person, Courier } = require("./models");

const adminBro = new AdminRouter({
  databases: [db],
  resources: [
      { resource: Person,
        options: {
          navigation: {
            name: 'content A',
            icon: 'fas fa-cogs',
          }
        }
      },
      { resource: Courier, options: {
          navigation: {
            name: 'content B',
            icon: 'CurrencyEuro',
          },
          properties: {
            id: {
              render: {
                show: (property, record, helpers) => {
                    const html = `
                <div>
                    <h1>Hello ${record.param('id')}</h1>
                </div>
                  `
                  return html
                }
              }
            }
          }
        }
      },
  ],
  branding: {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Rossiya-1_Logo.svg',
    companyName: 'Amazing c.o.',
  },
  rootPath: '/admin',
})

/*const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'aleksandr-piter@rambler.ru',
  password: process.env.ADMIN_PASSWORD || '1234'
}
const adminRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
  cookiePassword: process.env.ADMIN_COOKIE_PASS || 'sexdcfvghbnbgvfcdxszxdcfvgb',
  authenticate: async (email, password) => {
    if (email === ADMIN.email && password === ADMIN.password) {
      return ADMIN
    }
    return null
  }
})*/
const adminRouter = AdminBroExpress.buildRouter(adminBro,)
module.exports = adminRouter