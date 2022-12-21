export interface LinkType{
    name: string;
    link: string;
    active?: boolean;
}

export interface Dropdown{
    name: string;
    links: LinkType[];
    active?: boolean 
}

export interface GrantDocumentRow{
    user_id: string
    documents: Set<string>        
}
