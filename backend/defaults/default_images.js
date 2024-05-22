import prisma from "../DB/db.config.js";

const cloud_ids = [
    {
        alphabet:"A",
        id: 'avatar/aa6ayqtbhd4zixfp2zql',
        url: 'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796646/avatar/aa6ayqtbhd4zixfp2zql.jpg'
    },
    {
        alphabet:"B",
        id: 'avatar/idz7on9bnwqecp6dfj58',
        url: 'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796647/avatar/idz7on9bnwqecp6dfj58.jpg'
    },
    {
        alphabet:"C",
        id: 'avatar/sfv6cbqysugpzp90vf3m',
        url:'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796646/avatar/sfv6cbqysugpzp90vf3m.jpg'
    },
    {
        alphabet:"D",
        id: 'avatar/nz6noumdgexxqmpoqhuf',
        url: 'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796647/avatar/nz6noumdgexxqmpoqhuf.jpg'
    },
    {
        alphabet:"E",
        id: 'avatar/e9y3niu328b9hscrgnje',
        url: 'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796647/avatar/e9y3niu328b9hscrgnje.jpg'
    },
    {
        alphabet:"F",
        id: 'avatar/ccovrxeoszvrdkxvowbh',
        url: 'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796647/avatar/ccovrxeoszvrdkxvowbh.jpg'
    },
    {
        alphabet:"G",
        id: 'avatar/o5ppig7tv7j79jby48df',
        url: 'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796647/avatar/o5ppig7tv7j79jby48df.jpg'
    },
    {
        alphabet:"H",
        id: 'avatar/vv7ddl0fmjtauemyqbpx',
        url: 'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796648/avatar/vv7ddl0fmjtauemyqbpx.jpg'
    },
    {
        alphabet:"I",
        id: 'avatar/souqje9ns0r64kctd7ie',
        url: 'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796647/avatar/souqje9ns0r64kctd7ie.jpg'
    },
    {
        alphabet:"J",
        id: 'avatar/mbdzlfepd5dp3x8qbvhs',
        url: 'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796648/avatar/mbdzlfepd5dp3x8qbvhs.jpg'
    },
    {
        alphabet:"K",
        id: 'avatar/zong1sdjoisdhbtsyoj3',
        url: 'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796648/avatar/zong1sdjoisdhbtsyoj3.jpg'
    },
    {
        alphabet:"L",
        id: 'avatar/iwwe342iic0wwmqrp1pe',
        url: 'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796648/avatar/iwwe342iic0wwmqrp1pe.jpg'
    },
    {
        alphabet:"M",
        id: 'avatar/r1qfna5pj0shmmikg3tm',
        url: 'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796648/avatar/r1qfna5pj0shmmikg3tm.jpg'
    },
    {
        alphabet:"N",
        id: 'avatar/udifi6rfxidjangwfhbn',
        url: 'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796649/avatar/udifi6rfxidjangwfhbn.jpg'
    },
    {
        alphabet:"O",
        id: 'avatar/lsy4n4n4i2ta9qhjbbgh',
        url: 'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796649/avatar/lsy4n4n4i2ta9qhjbbgh.jpg'
    },
    {
        alphabet:"P",
        id: 'avatar/g8ar19e0gnyr77ffrtm5',
        url: 'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796649/avatar/g8ar19e0gnyr77ffrtm5.jpg'
    },
    {
        alphabet:"Q",
        id: 'avatar/vvrw5pxmtrctxwpl7utn',
        url: 'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796649/avatar/vvrw5pxmtrctxwpl7utn.jpg'
    },
    {
        alphabet:"R",
        id: 'avatar/s8dabhypk8pcqqifsb0p',
        url:'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796650/avatar/s8dabhypk8pcqqifsb0p.jpg'
    },
    {
        alphabet:"S",
        id: 'avatar/f9136rom6tpfcnangovc',
        url: 'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796651/avatar/f9136rom6tpfcnangovc.jpg'
    },
    {
        alphabet:"T",
        id: 'avatar/bbmgsvg6lsyt5zc10ccu',
        url: 'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796651/avatar/bbmgsvg6lsyt5zc10ccu.jpg'
    },
    {
        alphabet:"U",
        id: 'avatar/hti74rep9v91nfsveyc8',
        url: 'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796651/avatar/hti74rep9v91nfsveyc8.jpg'
    },
    {
        alphabet:"V",
        id: 'avatar/ib0bfgcnlnnmqp4qtjpy',
        url: 'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796651/avatar/ib0bfgcnlnnmqp4qtjpy.jpg'
    },
    {
        alphabet:"W",
        id: 'avatar/mzqrcnwc5njadc4r5usc',
        url: 'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796651/avatar/mzqrcnwc5njadc4r5usc.jpg'
    },
    {
        alphabet:"X",
        id: 'avatar/ucfcnymcljxizl9y6osr',
        url: 'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796652/avatar/ucfcnymcljxizl9y6osr.jpg'
    },
    {
        alphabet:"Y",
        id: 'avatar/gvdquapl1yd1hw2ouehc',
        url: 'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796652/avatar/gvdquapl1yd1hw2ouehc.jpg'
    },
    {
        alphabet:"Z",
        id: 'avatar/ui9tdfqg7s4lbaotgfu1',
        url: 'https://res.cloudinary.com/dooomcx1j/image/upload/v1714796653/avatar/ui9tdfqg7s4lbaotgfu1.jpg'
    }
]

const poster = {
    id:'avatar/emcc8cuq0jbbulaea3jk',
    url:'https://res.cloudinary.com/dooomcx1j/image/upload/v1714800551/avatar/emcc8cuq0jbbulaea3jk.jpg'
}
function isLetter(char) {
    return /^[a-zA-Z]$/.test(char);
}

export async function default_images(id,letter){
    try {
        const isL = isLetter(letter);
        let image;
        if(isL){
            image = cloud_ids.find(img => img.alphabet === letter?.toUpperCase());
        }
        else{
            image = '../public/profile.jpg'
        }
        

        const img = await prisma.user.update({
            where:{
                id
            },
            data:{
                avatar:image?.url || '../public/profile.jpg',
                backcover:poster?.url || '../public/poster.jpg'
            }
        })
    } catch (error) {
        throw error;
        // return res.status(500).json({status:500,msg:error?.message + "Error while default Avatar"});
    }
}