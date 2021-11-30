const person = {
  name: "vujson",
  sayName() {
    console.log(this.name)
  }
}

const age = 20


// exports 其实是module.exports的一个引用

exports.person = person
exports.age = age