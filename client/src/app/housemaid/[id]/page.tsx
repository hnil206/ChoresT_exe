'use client'
import Comment from '@/components/Comment';
export default function HousemaidPage( { params }: { params: { id: string } } ) {
    return (
        <div>
            <h1>Detail Housemaid</h1>
            <p>Housemaid ID: {params.id}</p>
            <Comment housemaidId={params.id} />
        </div>
    )
}