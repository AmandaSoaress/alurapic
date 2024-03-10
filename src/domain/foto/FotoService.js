export default class FotoService {
  constructor(resource) {
    this.api = false
    this._resource = resource('v1/fotos{/id}');
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
      if (window.localStorage.getItem('pictures')){
        pictures = JSON.parse(window.localStorage.getItem('pictures'))
      }
      resolve(pictures)
    }) 
  }
  cadastra(foto) {
    if (this.api) {
      if (foto._id) {
        return this._resource.update({
          id: foto._id
        }, foto);
      } else {
        return this._resource
          .save(foto);
      }
    }
    return new Promise((resolve, reject) => {
      let pictures = []
      if (window.localStorage.getItem('pictures')) {
        pictures = JSON.parse(window.localStorage.getItem('pictures'))
      } 
      foto._id = pictures.length+1
      pictures.push(foto)
      window.localStorage.setItem('pictures', JSON.stringify(pictures))
      resolve()
    })
  }
  apaga(id) {
    if (this.api) {
      return this._resource.delete({ id });
    }
    return new Promise((resolve, reject) => {
      let pictures = JSON.parse(window.localStorage.getItem('pictures'))
      pictures = pictures.filter(foto => foto._id != id)
      window.localStorage.setItem('pictures', JSON.stringify(pictures))
      resolve()
    })
  }
  busca(id) {
    if (this.api) {
      return this._resource.get({ id}).then(res => res.json());
    }
    return new Promise((resolve, reject) => {})
  }
}
