const bigInt = require('big-integer')

class SlowService{

	constructor(){
		this.a = bigInt(Number.MAX_VALUE).times(bigInt(Number.MAX_VALUE))
		this.b = bigInt(Number.MAX_VALUE).times(bigInt(Number.MAX_VALUE))
	}

	loopIterator(iter){
		for(let i = 0; i < iter; i++){
			let c = this.a.times(this.b).times(bigInt(i))
		}
	}
}

module.exports = SlowService