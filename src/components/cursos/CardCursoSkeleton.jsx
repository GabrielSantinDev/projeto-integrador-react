function CardCursoSkeleton() {
    return (
        <div className="card bg-base-100 shadow-sm border border-base-300">
            <div className="card-body">

                <div className="flex items-center justify-between">

                    {/* ESQUERDA */}
                    <div className="flex gap-4">

                        {/* thumbnail */}
                        <div className="w-32 h-20 skeleton rounded-2xl" />

                        <div className="flex flex-col">

                            {/* badges */}
                            <div className="flex gap-2 mb-2">
                                <div className="skeleton h-5 w-20 rounded-full" />
                                <div className="skeleton h-5 w-16 rounded-full" />
                            </div>

                            {/* título */}
                            <div className="skeleton h-4 w-64 mb-2" />

                            {/* descrição */}
                            <div className="space-y-2">
                                <div className="skeleton h-3 w-80" />
                                <div className="skeleton h-3 w-60" />
                            </div>

                            {/* footer info */}
                            <div className="flex items-center gap-4 mt-3">
                                <div className="skeleton h-4 w-16" />
                                <div className="skeleton h-4 w-20" />
                            </div>

                        </div>
                    </div>

                    {/* DIREITA (botões) */}
                    <div className="flex gap-2">

                        <div className="skeleton h-10 w-28 rounded-full" />
                        <div className="skeleton h-10 w-24 rounded-full" />
                        <div className="skeleton h-10 w-28 rounded-full" />

                    </div>

                </div>

            </div>
        </div>
    );
}

export default CardCursoSkeleton;