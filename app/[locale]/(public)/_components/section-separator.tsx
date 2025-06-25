export default function SectionSeparator() {
    return (
        <span className="flex items-center h-full my-12">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 "></span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 "></span>
        </span>
    );
}