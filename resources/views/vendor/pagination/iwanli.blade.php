@if ($paginator->hasPages())
<div class="bg-color-sky-light">
    <div class="content-xs container">
        <div class="row">
            <div class="col-sm-6 col-sm-offset-3">
                <div class="paginations-v2 text-center">
                    <ul class="paginations-v2-list">
                        @if ($paginator->onFirstPage())
                            <li class="disabled"><span>&laquo;</span></li>
                        @else
                            <li><a href="{{ $paginator->previousPageUrl() }}" rel="prev">&laquo;</a></li>
                        @endif
                        @foreach ($elements as $element)
                            @if (is_string($element))
                                <li class="disabled"><span>{{ $element }}</span></li>
                            @endif

                            @if (is_array($element))
                                @foreach ($element as $page => $url)
                                    @if ($page == $paginator->currentPage())
                                        <li class="active"><span>{{ $page }}</span></li>
                                    @else
                                        <li><a href="{{ $url }}">{{ $page }}</a></li>
                                    @endif
                                @endforeach
                            @endif
                        @endforeach

                        @if ($paginator->hasMorePages())
                            <li><a class="page-link" href="{{ $paginator->nextPageUrl() }}" rel="next">&raquo;</a></li>
                        @else
                            <li class="disabled"><span>&raquo;</span></li>
                        @endif
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
@endif
