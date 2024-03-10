import FotosDefault from "./FotosDefault";

export default class FotoService {
  constructor(resource) {
    this.api = false
    this._resource = resource('v1/fotos{/id}');
  }
  setupDefault() {
    window.localStorage.setItem('pictures', JSON.stringify(FotosDefault))
    return FotosDefault
  }
  lista() {
    if (this.api) {
      return this._resource
        .query()
        .then(res => res.json(), err => {
          console.log(err);
          throw new Error('Não foi possivel obter as fotos')
        });
    }
    return new Promise((resolve, reject) => {
      let pictures = []
      if (window.localStorage.getItem('pictures')) {
        pictures = JSON.parse(window.localStorage.getItem('pictures'))
      }
      if (!pictures.length) {
        pictures = this.setupDefault()
      }
      resolve(pictures)
    })
  }
  cadastra(foto) {
    if (this.api) {
      return this._resource.save(foto);
    }
    return new Promise((resolve, reject) => {
      let pictures = []
      if (window.localStorage.getItem('pictures')) {
        pictures = JSON.parse(window.localStorage.getItem('pictures'))
      }
      foto._id = pictures.length + 1
      pictures.push(foto)
      resolve(window.localStorage.setItem('pictures', JSON.stringify(pictures)))
    })
  }
  atualiza(foto) {
    if (this.api) {
      return this._resource.update({
        id: foto._id
      }, foto);
    }
    return new Promise((resolve, reject) => {
      let pictures = JSON.parse(window.localStorage.getItem('pictures'))
      pictures = pictures.map(picture => {
        if (picture._id == foto._id) {
          picture = foto
        }
        return picture
      })
      resolve(window.localStorage.setItem('pictures', JSON.stringify(pictures)))
    })
  }
  apaga(id) {
    if (this.api) {
      return this._resource.delete({
        id
      });
    }
    return new Promise((resolve, reject) => {
      let pictures = JSON.parse(window.localStorage.getItem('pictures'))
      pictures = pictures.filter(foto => foto._id != id)
      resolve(window.localStorage.setItem('pictures', JSON.stringify(pictures)))
    })
  }
  busca(id) {
    if (this.api) {
      return this._resource.get({
        id
      }).then(res => res.json());
    }
    return new Promise((resolve, reject) => {
      const pictures = JSON.parse(window.localStorage.getItem('pictures'))
      resolve(pictures.find(pic => pic._id == id))
    })
  }
}
