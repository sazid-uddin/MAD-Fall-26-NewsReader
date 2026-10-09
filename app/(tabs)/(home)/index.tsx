// app/(tabs)/(home)/index.tsx

import { router } from "expo-router";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ArticleCard from "../../../components/article-card";
import { Article, ARTICLES } from "../../../data/articles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function ArticleList() {
    const handlePress = (article: Article) => {
        router.push({
            pathname: "/(home)/[id]",
            params: { id: article.id },
        });
    };

    const handleCategoryPress = (category: String) => {
        setSelectedCategory(category);
    };

    const categories = Array.from(new Set(ARTICLES.map((article) => article.category)));
    const [selectedCategory, setSelectedCategory] = useState<String>("All");

    const filteredArticles = ARTICLES.filter((article) => {
        return selectedCategory === "All" ? 1 : article.category === selectedCategory;
    });

    return (
        <SafeAreaView edges={[]} style={styles.screen}>
            <FlatList
                data={filteredArticles}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ArticleCard article={item} onPress={handlePress} />}
                contentContainerStyle={styles.list}
                ListHeaderComponent={
                    <View style={styles.listHeader}>
                        <ScrollView horizontal>
                            <TouchableOpacity style={[styles.pill, selectedCategory === "All" && styles.selectedPill]} onPress={() => handleCategoryPress("All")}>
                                <Text style={[selectedCategory === "All" && styles.selectedPillText]}>All</Text>
                            </TouchableOpacity>
                            {categories.map((category) => (
                                <TouchableOpacity key={category} style={[styles.pill, selectedCategory === category && styles.selectedPill]} onPress={() => handleCategoryPress(category)}>
                                    <Text style={[selectedCategory === category && styles.selectedPillText]}>{category}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <Text style={styles.listHeaderText}>{filteredArticles.length} stories</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: "#F0F4F8" },
    list: { paddingTop: 12, paddingBottom: 32 },
    listHeader: { paddingHorizontal: 16, paddingBottom: 8 },
    listHeaderText: { fontSize: 12, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 1 },
    pill: {
        backgroundColor: "#E2E8F0",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 9999,
        marginHorizontal: 4,
        marginVertical: 8,
        alignSelf: "flex-start",
        height: 35,
    },
    selectedPill: {
        backgroundColor: "#0D1F4E",
    },
    selectedPillText: {
        color: "#FFFFFF",
    },
});
