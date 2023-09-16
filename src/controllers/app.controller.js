import AppService from '../services/app.service.js'

const AppController =  {
  home: (req, res, next) => {
      res.send(AppService.home());
  }
}

export default AppController;
