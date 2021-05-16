const AdminRouter = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')

const AdminBroSequelize = require('@admin-bro/sequelize')
AdminRouter.registerAdapter(AdminBroSequelize)

const db = require("./models");
const { Person, Courier } = require("./models");

const adminBro = new AdminRouter({
  databases: [db],
  resources: [
      { resource: Person, options: {
          navigation: {
            name: 'content',
            icon: 'Accessibility',
          }
        }
      },
      { resource: Courier, options: {
          navigation: {
            name: 'content',
            icon: 'CurrencyEuro',
          }
        }
      },
  ],
  branding: {
    //logo: '',
    companyName: 'Amazing c.o.',
  },
  rootPath: '/admin',
})
const adminRouter = AdminBroExpress.buildRouter(adminBro)
module.exports = adminRouter