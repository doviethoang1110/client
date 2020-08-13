export default class Category {
  constructor(id,name,slug,parentId,status) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.parentId = parentId;
    this.status = status;
  }
}
