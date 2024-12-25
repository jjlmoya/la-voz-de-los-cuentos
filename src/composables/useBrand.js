export default function useBrand() {


    const getBrands = () => {
        return [
            {
                name: "LaVozDeLosCuentos",
                link: "https://lavozdeloscuentos.es",
                lang: 'es'
            },
            {
                name: "BuboBoo",
                link: "https://buboboo.com",
                lang: 'en'
            },
        ]
    }

    return {
        getBrands
    }
}
