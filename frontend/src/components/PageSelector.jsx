import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.jsx";

function PageSelector({page, pages, onPageChange}) {
    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }
    return (
        <Pagination>
            <PaginationContent>
                {page !== 1 && (
                    <PaginationItem>
                        <PaginationPrevious onClick={() => onPageChange(page-1)} />
                    </PaginationItem>
                )}
                {pageNumbers.map((number) => (
                    <PaginationItem key={number} >
                        <PaginationLink
                            isActive={number === page}
                            onClick={() => onPageChange(number)}
                        >
                            {number}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {page !== pageNumbers.length && pageNumbers.length !== 0 && (
                    <PaginationItem>
                        <PaginationNext href={"#"} onClick={() => onPageChange(page+1)}/>
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}

export default PageSelector;