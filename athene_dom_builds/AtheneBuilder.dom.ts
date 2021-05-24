import AtheneBuilder from '../athene_builder';

for(let ab in AtheneBuilder) {
	window[ab] = AtheneBuilder[ab];
}


