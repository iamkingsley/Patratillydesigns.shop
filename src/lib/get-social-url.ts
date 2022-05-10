export const getSocialUrl = (socials: Array<{ icon: string, url: string }>, social: string) => {
    return socials.find(sc => sc?.icon === social)?.url;
}  