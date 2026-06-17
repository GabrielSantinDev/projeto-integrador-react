function CardCursoCatalogoSkeleton() {
    return (
        <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200 overflow-hidden flex flex-col">

            {/* Thumbnail */}
            <div className="h-36 relative">
                <div className="skeleton w-full h-full" />

                <div className="absolute top-3 left-3">
                    <div className="skeleton h-5 w-16 rounded-full" />
                </div>
            </div>

            {/* Conteúdo */}
            <div className="p-4 flex flex-col gap-2 flex-1">

                {/* Título */}
                <div className="space-y-2">
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-3/4" />
                </div>

                {/* Instrutor */}
                <div className="skeleton h-3 w-24 mt-1" />

                {/* Horas */}
                <div className="skeleton h-3 w-20 mt-2" />

                {/* Preço + Botão */}
                <div className="mt-auto pt-3 flex items-center justify-between">
                    <div className="skeleton h-5 w-20" />
                    <div className="skeleton h-8 w-28 rounded-lg" />
                </div>

            </div>

        </div>
    );
}

export default CardCursoCatalogoSkeleton;