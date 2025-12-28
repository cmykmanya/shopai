'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/mock-data';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, X, Clock } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save search to localStorage
  const saveSearch = (term: string) => {
    const searches = [...recentSearches.filter(s => s.toLowerCase() !== term.toLowerCase()), term];
    const limitedSearches = searches.slice(0, 5);
    setRecentSearches(limitedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(limitedSearches));
  };

  // Perform search
  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (term: string) => {
    setLoading(true);
    const data = await api.searchProducts(term);
    setResults(data);
    setLoading(false);

    if (term.trim()) {
      saveSearch(term.trim());
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery.trim());
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const trendingSearches = [
    'Summer Dress',
    'Running Shoes',
    'Denim Jacket',
    'Smart Watch',
    'Handbag',
    'Yoga Pants',
  ];

  const suggestions = results.length === 0 && query ? [
    { text: 'summer dresses', highlight: 'summer' },
    { text: 'summer clothes', highlight: 'summer' },
    { text: 'women summer fashion', highlight: 'summer' },
  ] : [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-4">Search</h1>

        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-12 text-lg"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setResults([]);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </form>
      </div>

      {/* No Query - Show Trending & Recent */}
      {!query && (
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Searches
                </h2>
                <Button variant="ghost" size="sm" onClick={clearRecentSearches}>
                  Clear all
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                    onClick={() => {
                      setSearchQuery(search);
                      performSearch(search);
                    }}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Trending Searches</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {trendingSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    performSearch(term);
                  }}
                  className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary hover:bg-primary/5 transition-colors text-left"
                >
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <span>{term}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {query && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              {loading ? 'Searching...' : `"${query}"`}
            </h2>
            {!loading && (
              <p className="text-muted-foreground">
                {results.length} {results.length === 1 ? 'result' : 'results'} found
              </p>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] bg-muted animate-pulse rounded-lg"
                />
              ))}
            </div>
          )}

          {/* Results */}
          {!loading && results.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {results.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && results.length === 0 && (
            <div className="max-w-md mx-auto text-center py-12">
              <Search className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any products matching "{query}"
              </p>

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-3">
                    Did you mean:
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {suggestions.map((suggestion, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={() => {
                          setSearchQuery(suggestion.text);
                          performSearch(suggestion.text);
                        }}
                      >
                        {suggestion.text}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending */}
              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  Trending now:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {trendingSearches.slice(0, 3).map((term) => (
                    <Badge
                      key={term}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => {
                        setSearchQuery(term);
                        performSearch(term);
                      }}
                    >
                      {term}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
