"use client";

import { useMemo, useState } from "react";

import type { GuestRow } from "./types";

type SortKey = "name" | "guests" | "message" | "created_at";

type SortDirection = "asc" | "desc";

type GuestsTableProps = {
    guests: GuestRow[];
    errorMessage?: string;
};

const defaultDirectionByKey: Record<SortKey, SortDirection> = {
    name: "asc",
    guests: "desc",
    message: "asc",
    created_at: "desc",
};

function formatDate(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "-";
    }
    return date.toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    });
}

export default function GuestsTable({ guests, errorMessage }: GuestsTableProps) {
    const [query, setQuery] = useState("");
    const [sortKey, setSortKey] = useState<SortKey | null>("created_at");
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

    const normalizedQuery = query.trim().toLowerCase();

    const filteredGuests = useMemo(() => {
        return guests.filter((guest) => {
            if (normalizedQuery) {
                const haystack = `${guest.name} ${guest.message ?? ""}`
                    .toLowerCase()
                    .trim();
                if (!haystack.includes(normalizedQuery)) {
                    return false;
                }
            }
            return true;
        });
    }, [guests, normalizedQuery]);

    const sortedGuests = useMemo(() => {
        if (!sortKey) {
            return filteredGuests;
        }

        const list = [...filteredGuests];
        const getTime = (value: string) => {
            const parsed = Date.parse(value);
            return Number.isNaN(parsed) ? 0 : parsed;
        };
        const multiplier = sortDirection === "asc" ? 1 : -1;

        switch (sortKey) {
            case "name":
                list.sort(
                    (a, b) =>
                        a.name.localeCompare(b.name, "pt-BR", {
                            sensitivity: "base",
                        }) * multiplier
                );
                break;
            case "guests":
                list.sort((a, b) => (a.guests - b.guests) * multiplier);
                break;
            case "message":
                list.sort(
                    (a, b) =>
                        (a.message ?? "").localeCompare(
                            b.message ?? "",
                            "pt-BR",
                            { sensitivity: "base" }
                        ) * multiplier
                );
                break;
            case "created_at":
            default:
                list.sort(
                    (a, b) =>
                        (getTime(a.created_at) - getTime(b.created_at)) *
                        multiplier
                );
                break;
        }

        return list;
    }, [filteredGuests, sortDirection, sortKey]);

    const hasFilters = Boolean(normalizedQuery);

    const getAriaSort = (key: SortKey) => {
        if (sortKey !== key) {
            return "none";
        }
        return sortDirection === "asc" ? "ascending" : "descending";
    };

    const handleSort = (key: SortKey) => {
        if (sortKey !== key) {
            setSortKey(key);
            setSortDirection(defaultDirectionByKey[key]);
            return;
        }

        if (sortDirection === defaultDirectionByKey[key]) {
            setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
            return;
        }

        setSortKey(null);
    };

    const renderIndicator = (key: SortKey) => {
        if (sortKey !== key) {
            return null;
        }
        return (
            <span className="ml-2 text-[10px] text-[#8f6a46]">
                {sortDirection === "asc" ? "^" : "v"}
            </span>
        );
    };

    return (
        <section className="overflow-hidden rounded-3xl border border-[#e5d9cb] bg-white/80">
            <div className="flex flex-col gap-4 border-b border-[#e5d9cb] px-6 py-5">
                <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.4em] text-[#8a7f74]">
                            Lista completa
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-end">
                    <div className="w-full md:w-52">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-[#8a7f74]">
                            Buscar
                        </label>
                        <input
                            type="search"
                            placeholder="Nome ou mensagem"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            className="mt-2 w-full rounded-xl border border-[#d9c9b4] bg-white/90 px-4 py-2 text-sm text-[#1b1a17] placeholder:text-[#9b8f83] focus:border-[#b98d5f] focus:outline-none focus:ring-2 focus:ring-[#ead6bf]"
                        />
                    </div>
                    {hasFilters && (
                        <button
                            type="button"
                            onClick={() => {
                                setQuery("");
                            }}
                            className="inline-flex items-center justify-center rounded-full border border-[#d9c9b4] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#1b1a17] transition hover:bg-white"
                        >
                            Limpar filtros
                        </button>
                    )}
                </div>
            </div>

            {errorMessage ? (
                <div className="px-6 py-10 text-sm text-[#6f655c]">{errorMessage}</div>
            ) : guests.length === 0 ? (
                <div className="px-6 py-10 text-sm text-[#6f655c]">
                    Nenhuma confirmacao registrada ainda.
                </div>
            ) : filteredGuests.length === 0 ? (
                <div className="px-6 py-10 text-sm text-[#6f655c]">
                    Nenhuma confirmacao atende aos filtros atuais.
                </div>
            ) : (
                <>
                    <div className="px-4 pb-4 md:hidden">
                        <div className="grid gap-3">
                            {sortedGuests.map((guest) => (
                                <div
                                    key={guest.id}
                                    className="rounded-2xl border border-[#e5d9cb] bg-white/90 p-4 shadow-[var(--shadow)]"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.3em] text-[#8a7f74]">
                                                Nome
                                            </p>
                                            <p className="mt-1 text-base font-medium text-[#1b1a17]">
                                                {guest.name}
                                            </p>
                                        </div>
                                        <div className="rounded-full border border-[#d9c9b4] bg-[#f6f2ec] px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[#6f655c]">
                                            {guest.guests} convidado
                                            {guest.guests === 1 ? "" : "s"}
                                        </div>
                                    </div>
                                    <div className="mt-3 grid gap-2 text-xs">
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="uppercase tracking-[0.3em] text-[#8a7f74]">
                                                Confirmado
                                            </span>
                                            <span className="text-[#1b1a17]">
                                                {formatDate(guest.created_at)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-3 rounded-xl border border-[#e5d9cb] bg-white/80 p-3 text-sm text-[#4f463f]">
                                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#8a7f74]">
                                            Mensagem
                                        </p>
                                        <p className="mt-1">
                                            {guest.message || "Sem mensagem"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="hidden overflow-x-auto md:block">
                        <table className="min-w-[720px] w-full text-left text-sm">
                            <thead className="bg-white/70 text-[10px] uppercase tracking-[0.3em] text-[#8a7f74]">
                                <tr>
                                    <th
                                        className="px-6 py-4 font-medium"
                                        aria-sort={getAriaSort("name")}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => handleSort("name")}
                                            className="inline-flex items-center gap-2 transition hover:text-[#1b1a17]"
                                        >
                                            <span>Nome</span>
                                            {renderIndicator("name")}
                                        </button>
                                    </th>
                                    <th
                                        className="px-6 py-4 font-medium"
                                        aria-sort={getAriaSort("guests")}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => handleSort("guests")}
                                            className="inline-flex items-center gap-2 transition hover:text-[#1b1a17]"
                                        >
                                            <span>Convidados</span>
                                            {renderIndicator("guests")}
                                        </button>
                                    </th>
                                    <th
                                        className="px-6 py-4 font-medium"
                                        aria-sort={getAriaSort("message")}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => handleSort("message")}
                                            className="inline-flex items-center gap-2 transition hover:text-[#1b1a17]"
                                        >
                                            <span>Mensagem</span>
                                            {renderIndicator("message")}
                                        </button>
                                    </th>
                                    <th
                                        className="px-6 py-4 font-medium"
                                        aria-sort={getAriaSort("created_at")}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => handleSort("created_at")}
                                            className="inline-flex items-center gap-2 transition hover:text-[#1b1a17]"
                                        >
                                            <span>Confirmado em</span>
                                            {renderIndicator("created_at")}
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e5d9cb]">
                                {sortedGuests.map((guest) => (
                                    <tr key={guest.id} className="align-top">
                                        <td className="px-6 py-4 font-medium text-[#1b1a17]">
                                            {guest.name}
                                        </td>
                                        <td className="px-6 py-4 text-[#1b1a17]">
                                            {guest.guests}
                                        </td>
                                        <td className="px-6 py-4 text-[#6f655c]">
                                            {guest.message || "Sem mensagem"}
                                        </td>
                                        <td className="px-6 py-4 text-xs text-[#8a7f74]">
                                            {formatDate(guest.created_at)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </section>
    );
}
